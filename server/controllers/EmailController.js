const { validationResult } = require("express-validator")
const Email = require("../models/Email")

module.exports = {
    collect: async (req, res, next) => {
        const { email, browserId } = req.body

        // Check validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.array() })
        }

        try {
            let cleanEmail = email.toLowerCase().replace(/\s+/g, '')
            let device = req.device.type.toUpperCase()

            let existSameBrowser = await Email.findOne({email: cleanEmail, browserId})

            if(!!existSameBrowser) {
                const err = {}
                err.param = `all`
                err.msg = `You already save this email from this browser`
                return res.status(401).json({ success: false, errors: [err] })
            }

            let existEmail = await Email.findOne({email: cleanEmail})

            if(!!existEmail) {
                if(![...existEmail.devices].find(x => x === device)) {
                    existEmail.devices = [...existEmail.devices, device]

                    await existEmail.save()
                }
            } else {
                let email = new Email()

                email.email = cleanEmail
                email.browserId = browserId
                email.devices = [device]

                await email.save()
            }

            return res.json({ success: true })
        } catch(e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(505).json({ success: false, errors: [err] })
        }
    },
}