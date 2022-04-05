import {default as debugFactory} from 'debug'
import path from 'path'

function logger(meta){
    if(!meta) throw new Error('meta is required to create a logger object');

    const dir = path.basename(path.resolve(meta.url, '../'));
    const mod = path.basename(meta.url, path.extname(meta.url));
    return debugFactory(`alto-api:${dir}/${mod}`);
}

export default logger
