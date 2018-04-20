<template>
  <header>
    <div class="header-bottom">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-4 hidden-xs">
            <div class="logo">
              <a href="/"><img alt="logo" src="../../../static/ega-archive/images/logo.png"/></a>
              Logo 10th year
              <!--<a href="/"><img alt="logo" src="/images/ega_header_logo_10.png" /></a>-->
            </div>
          </div>
          <div class="col-xs-12 visible-xs text-center">
            <div class="logo">
              <a href="/"><img alt="logo" src="../../../static/ega-archive/images/logo.png"/></a>
            </div>
          </div>
          <div class="col-md-8 col-sm-8 col-xs-12">
            <!-- Search Starts -->
            <div class="col-md-12 col-xs-12 nopad-r">
              <br/>
              <form id="search-form" method="get" class="form" action="https://ega-archive.org/submission-form.php/search-results.php" role="form">
                <div id="search" class="form-grp solr-search col-md-11 col-sm-10 col-xs-10 nopad-r">
                  <input id="query" name="query" type="text" autocomplete="off" class="form-control" placeholder="Search..." />
                </div>
                <div class="form-grp col-md-1 col-sm-2 col-xs-2">
                  <button class="btn-search" type="submit"></button>
                </div>
              </form>
            </div>
            <div class="pull-right nopad-r">
              <div class="quote">
                <a href="https://ega-archive.org/submission-form.php/howtosearch">Tips on how to search</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
