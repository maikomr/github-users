/**
 * Created by maiko on 30/12/2016.
 */
function TabsController() {
  var panes = this.panes = [];
  this.select = function(pane) {
    angular.forEach(panes, function(pane) {
      pane.selected = false;
    });
    pane.selected = true;
  };
  this.addPane = function(pane) {
    if (panes.length === 0) {
      this.select(pane);
    }
    panes.push(pane);
  };
}

function TabController() {
  this.$onInit = function() {
    this.tabsCtrl.addPane(this);
  };
}

angular.module('core.tabs', [])
.component('tabs', {
  transclude: true,
  controller: TabsController,
  templateUrl: 'core/tabs/tabs.template.html'
})
.component('pane', {
  transclude: true,
  require: {
    tabsCtrl: '^tabs'
  },
  bindings: {
    title: '@'
  },
  controller: TabController,
  templateUrl: 'core/tabs/pane.template.html'
});
