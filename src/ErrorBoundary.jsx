import React from "react";

class ErrorBoundary extends React.Component {
    state = {hasError: this.props.hasError};

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

ErrorBoundary.defaultProps = {
    hasError: false
};

export default ErrorBoundary;