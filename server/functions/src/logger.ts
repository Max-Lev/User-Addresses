 const logger = () => {
    const colorEnd = '\x1b[0m';

    const formatAndLog = (prefix: any, color: any, ...args: any) => {
        const formattedArgs = [prefix + args[0], ...args.slice(1)];
        formattedArgs.unshift(color);
        formattedArgs.push(colorEnd);
        console.log.apply(console, formattedArgs);
    };

    const info = (...args: any) => {
        formatAndLog("[demo server] ", '\x1b[36m', ...args);
    };

    const log = (...args: any) => {
        formatAndLog("", '\x1b[36m', ...args);
    };

    const warn = (...args: any) => {
        formatAndLog("[demo server] ", '\x1b[33m', ...args);
    };

    const error = (...args: any) => {
        formatAndLog("[demo server] ", '\x1b[31m', ...args);
    };

    return {
        info,
        log,
        warn,
        error
    };
};

// export default logger;
module.exports = logger();