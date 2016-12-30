/**
 * Created by maiko on 30/12/2016.
 */
function imageLoaded(img) {
  var imgWrapper = img.parentNode;
  imgWrapper.className += imgWrapper.className ? ' loaded' : 'loaded';
}
