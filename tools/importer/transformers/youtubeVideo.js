export default function transformVideo(main, document, html) {
    const videos = document.querySelectorAll('div.flex-video, figure.is-provider-youtube');
    videos.forEach((video) => {
        const link = video.querySelector('a[rel=noreferrer]');
        if (link && (link.href.indexOf('youtube.com') !== -1) || (link.href.indexOf('youtu.be') !== -1)) {
            const videolink = document.createElement('p');
            videolink.textContent = link.href;
            video.replaceWith(videolink);
        }
    });
}