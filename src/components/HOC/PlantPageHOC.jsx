import React, { Component } from 'react';
import { fetchPlant } from '../../api/plants';
import { AuthContext } from '../../helpers/Auth';
import Loading from '../Loading/Loading';
import { withRouter, Redirect } from 'react-router-dom';

function fetchPlantBackend(WrappedComponent) {
    class IndividualPlantHOC extends Component {
        static contextType = AuthContext;
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                plantId: '',
                plant: [],
                isLoading: true,
                error: null,
                redirect: ''
            }
        }

        async componentDidMount() {
            this._isMounted = true;
            const id = this.props.match.params.id;
            await this.fetchData(id);
        }

        fetchData = async (id) => {
            try {
                const res = await fetchPlant(id);
                console.log(res);
                if (res.error) {
                    this._isMounted && this.setState({
                        error: res.error
                    })
                } else {
                    this._isMounted && this.setState({
                        plant: res.data.plant,
                        isLoading: false,
                        error: null
                    })
                }
            } catch (error) {
                console.log(error.response.data);
                this._isMounted && this.setState({
                    redirect: '/notfound'
                })
            }
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        render() {
            const auth = this.context.isAuth;
            if (this.state.redirect) {
                return (<Redirect to={this.state.redirect} />)
            }

            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <WrappedComponent plant={this.state.plant} isAuth={auth} {...this.props} />
            );
        }
    }

    return withRouter(IndividualPlantHOC);
}

export default fetchPlantBackend;