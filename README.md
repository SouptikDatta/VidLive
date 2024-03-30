# VidLive : Video Application with Live Chat Subtitles

# Deploy Link : The application is deployed and can be accessed at [https://vidlive-souptik.netlify.app/watch?v=WjArnmhiJUE](https://vidlive-souptik.netlify.app/watch?v=WjArnmhiJUE).


This is a video application resembling YouTube's live chat feature. The application allows users to watch videos on the left side while displaying subtitles on the right side as a list with timestamps. Users can click on a subtitle to load the video to the corresponding timestamp.

## Features

- Video playback
- Live chat subtitles synchronized with video
- Clickable subtitles to navigate to specific timestamps in the video

## Components

### Header
- Contains branding/logo and navigation elements.

### Body
- Main container for the application layout.
  
  #### Sidebar
  - Contains menu items or additional navigation options.

  #### Main Container
  - Houses the main content of the application.

    ##### ButtonList
    - List of buttons or controls for interacting with the video.
    
    ##### VideoContainer
    - Area where the video player is displayed.
    
      ###### VideoCard
      - Component for rendering individual video cards.

### Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the application with `npm start`.
4. Access the application through the provided URL.

### Technologies Used

- React
- react-redux for state management
- react-router-dom for routing
- HTML5 Video API for video playback

### File Structure

- `App.js`: Main entry point of the application.
- `App.css`: Stylesheet for the application.
- `utils/store.js`: Redux store configuration.
- `components/`: Directory containing various React components used in the application.

### Folder Structure


### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to submit a pull request or open an issue.

### License

This project is licensed under the [MIT License](LICENSE).
