import React from 'react'
import emailApi from './apis/email'
import CookieController from './controllers/CookieController'
import { getRandomInteger } from './controllers/FunctionController'

class App extends React.Component {
    state = {
        email: '',
        errors: [],
        isFetching: false,
        isSuccess: false,
    }

    componentDidMount() {
        let browserId = CookieController.get('browserId')

        if(!browserId) {
            browserId = getRandomInteger(1000000, 9999999)
            CookieController.set('browserId', browserId, 365)
        }
    }

    submit = (e) => {
        e.preventDefault();

        if(this.state.isFetching)
            return
        
        this.setState({isFetching: true, errors: [], isSuccess: false})

        let browserId = CookieController.get('browserId')

        emailApi.collect({
            email: this.state.email,
            browserId,
        }).then(response => {
            if(response.success) {
                this.setState({isSuccess: true})
            } else {
                this.setState({errors: response.errors})
            }

            this.setState({isFetching: false})
        })
    }

    render() {
        return <form onSubmit={this.submit}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <input type="text" placeholder="Email" onChange={(e) => {
                    this.setState({email: e.target.value})
                }} />
                {this.state.errors.filter((error) => error.param === 'email').map((error) => <span key={error.msg}>{error.msg}</span>)}
            </div>

            {this.state.errors.filter((error) => error.param === 'all').map((error) => <span key={error.msg}>{error.msg}</span>)}

            {this.state.isSuccess && <span style={{color: 'green'}}>Your email was collected!</span>}

            <button type="submit">Collect</button>
        </form>
    }
}

export default App