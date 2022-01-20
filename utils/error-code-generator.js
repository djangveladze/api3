class ErrorCodeGenerator {
    generateErrorCode(err) {
        if (err.code === undefined) {
            return 500;
        }
        return err.code
    }
}

module.exports = ErrorCodeGenerator