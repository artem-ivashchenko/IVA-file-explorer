import { Dropbox } from 'dropbox';

const token = process.env.REACT_APP_DROPBOX_TOKEN;

const dbx = new Dropbox({
    accessToken: token,
    fetch: window.fetch.bind(window),
});

export default dbx;
