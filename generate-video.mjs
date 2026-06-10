import RunwayML, { TaskFailedError } from '@runwayml/sdk';

const client = new RunwayML();

// Create a new text-to-video task using the "gen4.5" model
try {
  const task = await client.imageToVideo
    .create({
      model: 'gen4.5',
      // No promptImage needed for text-to-video
      promptText: 'A serene mountain landscape at sunrise with mist rolling through the valleys',
      ratio: '1280:720',
      duration: 5,
    })
    .waitForTaskOutput();

  console.log('Task complete:', task);
} catch (error) {
  if (error instanceof TaskFailedError) {
    console.error('The video failed to generate.');
    console.error(error.taskDetails);
  } else {
    console.error(error);
  }
}
