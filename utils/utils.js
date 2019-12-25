const _ = require('lodash');
import cuid from 'cuid'
import slugify from 'slugify';

const randomstring = require('randomstring');


function getTimeNow () {
  return Math.floor(Date.now() / 1000);
}

function getNextTime (listData, size) {
  let nextPage = -1;
  let totalRow = listData.length;
  if (totalRow > size) {
    nextPage = 1;
    for (let i = 0; i < totalRow - size; i++) {
      listData.pop();
    }
  }
  return ({
    results: listData,
    nextPage: nextPage,
  });
}

export function _pick (obj, props) {
  const results = {};

  for (let i = 0; i < props.length; i++) {
    if (typeof obj[props[i]] !== 'undefined') {
      results[props[i]] = obj[props[i]]
    }
  }

  return results
}

function tryCatchWrapper (func) {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {

      if (err.isCustomError) {
        console.log(err.debug);
        const message = process.env.NODE_ENV === 'development' && err.debug ? err.message + ' ' + err.debug.message : err.message;
        return res.RH.error({ success: false, status: err.status || 500, error: message })
      }

      console.log(`Error in ${func.name} at ${new Date()} with:`, err);
      return res.RH.error({ success: false, status: 500, error: 'Internal server error' })
    }
  }
}

function applyWrapper (obj) {
  let result = {};
  Object.keys(obj).forEach((key) => {
    result[key] = tryCatchWrapper(obj[key]);
  });
  return result;
}

function getPostSlug (title) {
  const slug = slugify(title);
  return slug + '-' + cuid.slug()
}

function getPostThumbnails (post) {
  let urls = [];
  let jsonObj = post.content;
  console.log(post);
  // parse entityMap
  let entityMap = jsonObj.entityMap;
  for (let k in entityMap) {
    if (entityMap.hasOwnProperty(k) && entityMap[k].type === 'embed' && entityMap[k].data.url.startsWith('https://www.youtube.com')) {
      urls.push(entityMap[k].data.url);
    }
  }

  // parse blocks
  let blocks = jsonObj.blocks;
  blocks.forEach(block => {
    if (/(:image)$/.test(block.type)) {
      let imgUrl = block.data.src;
      let index = imgUrl.indexOf('uploads');
      urls.push(imgUrl.substring(index));
    }
  });

  return urls;
}

/**
 * auto generate code
 */
function generateCode (length = 10) {
  return randomstring.generate({
    length: length,
    charset: 'alphanumeric'
  });
}

function parsePagingQuery (req) {
  return {
    page: parseInt(req.query.page) || 1,
    size: parseInt(req.query.size) || 10
  }
}

function parseMinuteToMillisec (minutes) {
  return minutes * 60 * 1000
}

module.exports = {
  _pick,
  applyWrapper,
  getPostSlug,
  getPostThumbnails,
  getTimeNow: getTimeNow,
  getNextTime: getNextTime,
  generateCode: generateCode,
  parsePagingQuery,
  parseMinuteToMillisec
};
