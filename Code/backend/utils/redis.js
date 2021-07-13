const asyncRedis = require('async-redis');
const {config} = require('../config/globalConfig')
const client = null;


const SET = async (key, value) => {
  const reply = await client.set(key, value);
  return reply;
};

const GET = async (key) => {
  const reply = await client.get(key);
  return reply;
};

const HMGET = async (hname, key) => {
  const reply =  await client.hmget(hname, key);
  return reply;
};

const HGETALL = async (hname) => {
  const reply =  await client.hgetall(hname);
  return reply;
};

const HDEL = async (hname, key) => {
  const reply =  await client.hdel(hname, key);
  return reply;
};

const HMSET = async (hname, key, value) => {
  const reply = await client.hmset(hname, key, value);
  return reply;
};

const LPUSH = async (lname, value) => {
  const reply = await client.lpush(lname, value);
  return reply;
};

const LLEN = async (lname) => {
  const reply = await client.llen(lname);
  return reply;
};

const RPUSH = async (lname, arrayOfValues) => {
  const reply = await client.rpush(lname, arrayOfValues);
  return reply;
};

const LREM = async (lname, count, value) => {
  const reply = await client.lrem(lname, count, value);
  return reply;
};

module.exports = {
  SET,
  GET,
  HMGET,
  HGETALL,
  HDEL,
  HMSET,
  LPUSH,
  RPUSH,
  LREM,
  LLEN
};
