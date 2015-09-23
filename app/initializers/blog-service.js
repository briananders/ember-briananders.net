export function initialize(container, application) {
  application.inject('route', 'blogService', 'service:blog-service');
  application.inject('view', 'blogService', 'service:blog-service');
  application.inject('route', 'blogService', 'service:blog-service');
  application.inject('controller', 'blogService', 'service:blog-service');
  application.inject('component', 'blogService', 'service:blog-service');
}

export default {
  name: 'blog-service',
  initialize: initialize
};
