#!/bin/bash

## https://jshakespeare.com/encoding-browser-friendly-video-files-with-ffmpeg
ffmpeg -i public/video/src/MAMA.mp4 -y -f webm -vcodec libvpx-vp9 -vb 1024k public/video/MAMA.webm
ffmpeg -i public/video/src/GURU.mp4 -y -f webm -vcodec libvpx-vp9 -vb 1024k public/video/GURU.webm
ffmpeg -i public/video/src/GURU_portrait.mp4 -y -f webm -vcodec libvpx-vp9 -vb 1024k public/video/GURU_portrait.webm
ffmpeg -i public/video/src/GURU_portrait.mp4 -y -f webm -vcodec libvpx-vp9 -vb 1024k public/video/GURU_portrait.webm

ffmpeg -i public/video/src/MAMA.mp4 -y -vcodec libx264 -f mp4 -vb 1024k -preset slow public/video/MAMA.mp4
ffmpeg -i public/video/src/GURU.mp4 -y -vcodec libx264 -f mp4 -vb 1024k -preset slow public/video/GURU.mp4
ffmpeg -i public/video/src/MAMA_portrait.mp4 -y -vcodec libx264 -f mp4 -vb 1024k -preset slow public/video/MAMA_portrait.mp4
ffmpeg -i public/video/src/GURU_portrait.mp4 -y -vcodec libx264 -f mp4 -vb 1024k -preset slow public/video/GURU_portrait.mp4


## https://gist.github.com/jaydenseric/220c785d6289bcfd7366

#ffmpeg -i input.mov -c:v libvpx -qmin 0 -qmax 25 -crf 4 -b:v 1M -vf scale=1280:-2 -c:a libvorbis -threads 0 output.webm

#ffmpeg -i input.mov -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -crf 22 -preset veryslow -vf scale=1280:-2 -c:a aac -strict experimental -movflags +faststart -threads 0 output.mp4


## https://video.stackexchange.com/questions/19590/convert-mp4-to-webm-without-quality-loss-with-ffmpeg
#ffmpeg -i public/video/MAMA.mp4 -y -c:v libvpx-vp9 -crf 29 -b:v 0 public/video/MAMA.webm
#ffmpeg -i public/video/GURU.mp4 -y -c:v libvpx-vp9 -crf 29 -b:v 0 public/video/GURU.webm
#ffmpeg -i public/video/MAMA_portrait.mp4 -y -c:v libvpx-vp9 -crf 29 -b:v 0 public/video/MAMA_portrait.webm
#ffmpeg -i public/video/GURU_portrait.mp4 -y -c:v libvpx-vp9 -crf 29 -b:v 0 public/video/GURU_portrait.webm
