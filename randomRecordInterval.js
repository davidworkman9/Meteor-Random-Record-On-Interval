randomWithinRange = function randomWithinRange (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Images = new Meteor.Collection('Images');

if (Meteor.isClient) {
  Template.img.src = function () {
    var img = Images.findOne();
    if(img)
      return img.Image_FileName;
  };
  Meteor.startup(function () {
    var oldSubscription, subscription;

    var newImage = function () {
      Meteor.call('getImageCount', function (err,count) {
        if(!err) {
          var skip = randomWithinRange(0, count);
          subscription = Meteor.subscribe('randomImage', skip, function () {
            if(oldSubscription)
              oldSubscription.stop();
            oldSubscription = subscription;
          });
        }
      });
    };
    newImage();
    Meteor.setInterval(newImage, 5 * 1000);
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    getImageCount: function () {
      return Images.find().count();
    }
  });

  Meteor.publish('randomImage', function (numToSkip) {
    check(numToSkip, Number);
    return Images.find({}, {limit: 1, skip: numToSkip});
  });

  Meteor.startup(function () {
    Images.remove({});
    Images.insert({Image_FileName:"highlight_banner_zk7preview.png"});
    Images.insert({Image_FileName:"highlight_banner_zkstudio20.png"});
    Images.insert({Image_FileName:"ZKBanners_communityboard_summer2013.png"});
    Images.insert({Image_FileName:"bd294ce7ff4c43b6aad4aa4169fb819b.jpg"});
    Images.insert({Image_FileName:"a2711881be8c40ea8af4b32ac47a602a.png"});
    Images.insert({Image_FileName:"12f0cc69cd9742faa9c8ee0f7b0d210e.jpg"});
    Images.insert({Image_FileName:"1b9587c10bca4610ab76bf19fa996988.png"});
    Images.insert({Image_FileName:"a7360b39ac39490cac9574e12189c2bb.png"});
    Images.insert({Image_FileName:"db5df4870e4e4b6cbf42727fd434701a.jpg"});
    Images.insert({Image_FileName:"d18eea9d28f3490b8dcbfa9e38f8336e.jpg"});
    Images.insert({Image_FileName:"0a1c2db4e6b64c69aad3afb9a35078b9.png"});
    Images.insert({Image_FileName:"69b4c658-bdab-4d8e-849f-fe76f1cb4b0f.jpg"});
    Images.insert({Image_FileName:"d9a919813dac42adbd0e3106bc19bc04.png"});
    Images.insert({Image_FileName:"fe2d24dd0d6d4c10924649cae5d8efc6.png"});
    Images.insert({Image_FileName:"653ca792504048088b96cc67db93fe15.jpg"});
    Images.insert({Image_FileName:"9874675e098b40df937e802c364f8685.png"});
  });
}
