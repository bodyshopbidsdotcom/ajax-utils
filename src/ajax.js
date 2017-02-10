// uses fetch, github's polyfill to support ie9+ https://github.com/github/fetch/tree/0.11

import queryString from 'query-string';
import ApiError from './ApiError';

const ContentType = {
  JSON: 'application/json'
};

function getJsonHeaders() {
  return {
    'Accept': ContentType.JSON,
    'Content-Type': ContentType.JSON
  };
}


function parseJsonResponse(response) {
  return response.json().then(data => {
    if (data && data.error) {
      throw new ApiError(data.error, response.status, response);
    }
    return data;
  });
}

function doXHRJson(method, url, body, options = {}) {
  const fetchParams = {
    method: method,
    headers: getJsonHeaders(),
    credentials: 'same-origin'
  };

  if (["post", "put"].includes(method.toLowerCase())) {
    fetchParams.body = JSON.stringify(body);
  }

  if (options && options.queryParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryString.stringify(options.queryParams);
    delete options.queryParams;
  }

  return fetch(url, fetchParams)
    .then(parseJsonResponse);
}


export function getJson(url, options) {
  return doXHRJson("get", url, null, options);
}

export function postJson(url, body, options) {
  return doXHRJson("post", url, body, options);
}

export function putJson(url, body, options) {
  return doXHRJson("put", url, body, options);
}

export function deleteJson(url, options) {
  return doXHRJson("delete", url, null, options);
}
