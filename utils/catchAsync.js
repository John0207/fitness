module.exports = func => {
    return (req, res, next) => {
        func(res, req, next).catch(next);
    }
}