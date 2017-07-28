window.$ = window.jQuery = require "jquery"

class App

  constructor: ->
    @init()

  init: =>

    $(document).ready =>
    	alert("foi")
            
              

  module.exports = new App