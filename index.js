const chalkAnimation = require('chalk-animation');
const figlet = require('figlet');

const {
  INPUT_NAME,
  INPUT_EXIT,
  INPUT_SECONDS_TO_STOP = '60',
  GITHUB_ACTOR,
} = process.env;

const displayName = INPUT_NAME || GITHUB_ACTOR;

const message = `Happy Birthday, ${displayName}!`;
// Increase the spacing between words in the message.
const formattedMessage = message.replace(/ /g, '   ');

(async () => {
  try {
    const data = await new Promise((resolve, reject) => {
      figlet(formattedMessage, function (err, data) {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
    const animation = chalkAnimation.rainbow(data);
    animation.start();

    setTimeout(() => {
      animation.stop();
      if (INPUT_EXIT) {
        process.exit(1);
      }
    }, parseInt(INPUT_SECONDS_TO_STOP, 10) * 1000)
  } catch (err) {
    console.log('Something went wrong ...');
    console.dir(err);
  }
})();
