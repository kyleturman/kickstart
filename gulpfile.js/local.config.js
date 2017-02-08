/* ---------------------------------------
  LOCAL CONFIG
   --------------------------------------- */

module.exports = {
  deploy: {
    source: 'public/',
    user: 'username',
    host: 'domain.com',
    port: 1234,
    dest: '/remove/path',
    exclude_list: 'rsync-exclude.txt'
  }
};
