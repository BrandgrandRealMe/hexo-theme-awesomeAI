/* global hexo */

'use strict'

const noteTag = require('./note')(hexo)
hexo.extend.tag.register('note', noteTag, true)

const buttonTag = require('./button')(hexo)
hexo.extend.tag.register('button', buttonTag, true)
hexo.extend.tag.register('btn', buttonTag, true)

const tabsTag = require('./tabs')(hexo)
hexo.extend.tag.register('tabs', tabsTag, true)

const newsletterSignupTag = require('./newsletter-signup')(hexo)
hexo.extend.tag.register('newsletter-signup', newsletterSignupTag, true)
hexo.extend.tag.register('ns', newsletterSignupTag, true)

const audioTag = require('./audio')(hexo)
hexo.extend.tag.register('audio', audioTag, true)
hexo.extend.tag.register('ap', audioTag, true)
