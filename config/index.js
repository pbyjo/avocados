const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const protocol = process.env.PROTOCOL || 'http(s)://';
const protocolLocal = process.env.PROTOCOL_LOCAL || 'http://';

export const api = process.env.API || '/api/avo';
export const server = dev ? `${protocolLocal}${host}:${port}`:`${protocol}platzi-avo.vercel.app/`;