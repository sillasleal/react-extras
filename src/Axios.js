import React, {Component, isValidElement} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
/**/

/**
 * Componnente que realiza as requisições.
 * @description text
 * @author Sillas S. Leal<sillas.s.leal@gmail.com>
 */
export default class Axios extends Component {
    static propTypes = {
      instance: PropTypes.any,
      url: PropTypes.string.isRequired,
      submitToOnClick: PropTypes.bool,
      data: PropTypes.object,
      run: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      method: PropTypes.string,
      autoCancel: PropTypes.bool,
      config: PropTypes.object,
      isRunning: PropTypes.func,
      onRequest: PropTypes.func,
      onResponse: PropTypes.func,
      onSuccess: PropTypes.func,
      onError: PropTypes.func,
      fallback: PropTypes.element,
      children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.element,
        PropTypes.node,
      ]),
    }

    static defaultProps = {
      data: { },
      submitToOnClick: true,
      instance: axios,
      run: true,
      method: 'get',
      autoCancel: true,
      children: null,
      config: { },
      isRunning: () => ({ }),
      onRequest: () => ({ }),
      onResponse: () => ({ }),
      onSuccess: () => ({ }),
      onError: () => ({ }),
    }

    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        response: { },
      };
      this._isMounted = false;
      this._sourceCancel = null;
    }

    componentWillUnmount() {
      this._isMounted = false;
      if (this._sourceCancel && this.props.autoCancel) {
        this._sourceCancel.cancel('Axios UnMount');
      }
    }

    setState(a, b, c) {
      if (this._isMounted) {
        super.setState(a, b, c);
      }
    }

    componentDidMount() {
      this._isMounted = true;
      if (this.props.run) {
        this.submit(this.props);
      }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.run && this.props.run !== prevProps.run) {
        this.submit(this.props);
      }
    }

    /**
     * Método que realiza o submit
     * @param {Object} props As props a serem usadas na requisição
     */
    async submit(props) {
      const {
        url, data, method, config,
        onSuccess, onError, onRequest, onResponse, isRunning,
      } = props;
      this.setState({
        isLoading: true,
        response: { },
      });
      isRunning(true);
      this._sourceCancel = this.props.instance.CancelToken.source();
      const reqUrl = url;
      const requestConfigs = {
        ...config,
        cancelToken: this._sourceCancel.token,
      };
      let success; let error;
      /**/
      try {
        onRequest(props);
        if (['post', 'put', 'patch'].indexOf(method) > -1) {
          if (config.inRoute) {
            success = await this.props.instance[method](
                `${reqUrl}/${config.inRoute}`,
                data,
                requestConfigs,
            );
          } else {
            success = await this.props.instance[method](
                reqUrl,
                data,
                requestConfigs,
            );
          }
        } else {
          if (config.inRoute) {
            success = await this.props.instance[method](
                `${reqUrl}/${config.inRoute}`,
                requestConfigs,
            );
          } else {
            success = await this.props.instance[method](reqUrl, requestConfigs);
          }
        }
        onSuccess(success);
        this.setState({
          isLoading: false,
          response: {success},
        });
      } catch (erro) {
        error = erro;
        onError(error);
        this.setState({
          isLoading: false,
          response: {error},
        });
      }
      this._sourceCancel = undefined;
      isRunning(false);
      onResponse(success, error);
    }

    render() {
      const {response, isLoading} = this.state;
      const {children, submitToOnClick, fallback} = this.props;
      /**/
      if (isValidElement(fallback) && isLoading) {
        const Fall = fallback.type;
        /**/
        return <Fall {...fallback.props} />;
      } else {
        if (isValidElement(children)) {
          const Cpm = children.type;
          /**/
          if (submitToOnClick) {
            return <Cpm {...children.props}
              response={response}
              isLoading={isLoading}
              onClick={() => this.submit(this.props)}/>;
          } else {
            return <Cpm {...children.props}
              response={response}
              isLoading={isLoading}
              onSubmit={(props = {}) => this.submit({
                ...this.props,
                ...props,
              })}/>;
          }
        } else if (typeof children === 'function') {
          return this.props.children({
            response,
            isLoading,
            submit: (props = {}) => this.submit({
              ...this.props,
              ...props}),
          });
        } else {
          return null;
        }
      }
    }
}
