"use strict";
/**
 * Created by laurence-ho on 21/07/17.
 */
var db = require('./database/db.service');
var config = require('./config');
var authentication = {};
authentication.checkAdmin = function (req, res, next) {
    if (req.isAuthenticated()) {
        db.getConnection(function (err, connection) {
            if (err) {
                res.status(500).send({ message: err });
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.USERS + ' WHERE username = ?', [req.params.username], function (err, rows) {
                    connection.release();
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    else {
                        if (rows[0].level >= 11) {
                            next();
                        }
                        else {
                            res.status(403).send({ message: 'You have no permission' });
                        }
                    }
                });
            }
        });
    }
    else {
        res.status(403).send({ message: 'Please Login First' });
    }
};
authentication.checkManager = function (req, res, next) {
    if (req.isAuthenticated()) {
        db.getConnection(function (err, connection) {
            if (err) {
                res.status(500).send({ message: err });
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.USERS + ' WHERE username = ?', [req.params.username], function (err, rows) {
                    connection.release();
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    else {
                        if (rows[0].level >= 5) {
                            next();
                        }
                        else {
                            res.status(403).send({ message: 'You have no permission' });
                        }
                    }
                });
            }
        });
    }
    else {
        res.status(403).send({ message: 'Please Login First' });
    }
};
authentication.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(403).send({ message: 'Please Login First' });
};
module.exports = authentication;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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KiBDcmVhdGVkIGJ5IGxhdXJlbmNlLWhvIG9uIDIxLzA3LzE3LlxuICovXG5cbmNvbnN0IGRiID0gcmVxdWlyZSgnLi9kYXRhYmFzZS9kYi5zZXJ2aWNlJyk7XG5sZXQgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbmxldCBhdXRoZW50aWNhdGlvbjogYW55ID0ge307XG5cbmF1dGhlbnRpY2F0aW9uLmNoZWNrQWRtaW4gPSAocmVxOiBhbnksIHJlczogYW55LCBuZXh0OiBhbnkpID0+IHtcblx0aWYgKHJlcS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuXHRcdGRiLmdldENvbm5lY3Rpb24oKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpID0+IHtcblx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0cmVzLnN0YXR1cyg1MDApLnNlbmQoe21lc3NhZ2U6IGVycn0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSAnK2NvbmZpZy5kYl90YWJsZXMuVVNFUlMrJyBXSEVSRSB1c2VybmFtZSA9ID8nLCBbcmVxLnBhcmFtcy51c2VybmFtZV0sIChlcnI6IGFueSwgcm93czogYW55KSA9PiB7XG5cdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCh7bWVzc2FnZTogZXJyfSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChyb3dzWzBdLmxldmVsID49IDExKSB7XG5cdFx0XHRcdFx0XHRcdG5leHQoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlcy5zdGF0dXMoNDAzKS5zZW5kKHttZXNzYWdlOiAnWW91IGhhdmUgbm8gcGVybWlzc2lvbid9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHJlcy5zdGF0dXMoNDAzKS5zZW5kKHttZXNzYWdlOiAnUGxlYXNlIExvZ2luIEZpcnN0J30pO1xuXHR9XG59O1xuXG5hdXRoZW50aWNhdGlvbi5jaGVja01hbmFnZXIgPSAocmVxOiBhbnksIHJlczogYW55LCBuZXh0OiBhbnkpID0+IHtcblx0aWYgKHJlcS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuXHRcdGRiLmdldENvbm5lY3Rpb24oKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpID0+IHtcblx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0cmVzLnN0YXR1cyg1MDApLnNlbmQoe21lc3NhZ2U6IGVycn0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSAnK2NvbmZpZy5kYl90YWJsZXMuVVNFUlMrJyBXSEVSRSB1c2VybmFtZSA9ID8nLCBbcmVxLnBhcmFtcy51c2VybmFtZV0sIChlcnI6IGFueSwgcm93czogYW55KSA9PiB7XG5cdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCh7bWVzc2FnZTogZXJyfSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChyb3dzWzBdLmxldmVsID49IDUpIHtcblx0XHRcdFx0XHRcdFx0bmV4dCgpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzLnN0YXR1cyg0MDMpLnNlbmQoe21lc3NhZ2U6ICdZb3UgaGF2ZSBubyBwZXJtaXNzaW9uJ30pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0cmVzLnN0YXR1cyg0MDMpLnNlbmQoe21lc3NhZ2U6ICdQbGVhc2UgTG9naW4gRmlyc3QnfSk7XG5cdH1cbn07XG5cbmF1dGhlbnRpY2F0aW9uLmlzTG9nZ2VkSW4gPSAocmVxOiBhbnksIHJlczogYW55LCBuZXh0OiBhbnkpID0+IHtcblx0aWYgKHJlcS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuXHRcdHJldHVybiBuZXh0KCk7XG5cdH1cblx0cmVzLnN0YXR1cyg0MDMpLnNlbmQoe21lc3NhZ2U6ICdQbGVhc2UgTG9naW4gRmlyc3QnfSk7XG59O1xuXG5leHBvcnQgPSBhdXRoZW50aWNhdGlvbjtcblxuIl19