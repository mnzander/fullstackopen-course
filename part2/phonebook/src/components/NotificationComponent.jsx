const Notification = ({ errorMessage, message }) => {
    if (message === null && errorMessage === null) {
        return null;
    }

    return (
        <>
            {message !== null && (
                <div className="message">
                    {message}
                </div>
            )}
            {errorMessage !== null && (
                <div className="error">
                    {errorMessage}
                </div>
            )}
        </>
    );
};

export default Notification;