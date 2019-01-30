#!/bin/bash

## https://gist.github.com/jaydenseric/220c785d6289bcfd7366
# ffmpeg -i public/video/src/MAMA.mp4 -y -c:v libvpx-vp9 -crf 25 -b:v 0 -c:a libvorbis -threads 0 public/video/MAMA.webm
# ffmpeg -i public/video/src/GURU.mp4 -y -c:v libvpx-vp9 -crf 25 -b:v 0 -c:a libvorbis -threads 0 public/video/GURU.webm
# ffmpeg -i public/video/src/MAMA_portrait.mp4 -y -c:v libvpx-vp9 -crf 25 -b:v 0 -c:a libvorbis -threads 0 public/video/MAMA_portrait.webm
# ffmpeg -i public/video/src/GURU_portrait.mp4 -y -c:v libvpx-vp9 -crf 25 -b:v 0 -c:a libvorbis -threads 0 public/video/GURU_portrait.webm
ffmpeg -i public/video/src/MAMA.mp4 -y -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -crf 31 -preset veryslow -c:a aac -strict experimental -movflags +faststart -threads 0 public/video/MAMA.mp4
ffmpeg -i public/video/src/GURU.mp4 -y -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -crf 31 -preset veryslow -c:a aac -strict experimental -movflags +faststart -threads 0 public/video/GURU.mp4
ffmpeg -i public/video/src/MAMA_portrait.mp4 -y -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -crf 31 -preset veryslow -c:a aac -strict experimental -movflags +faststart -threads 0 public/video/MAMA_portrait.mp4
ffmpeg -i public/video/src/GURU_portrait.mp4 -y -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -crf 31 -preset veryslow -c:a aac -strict experimental -movflags +faststart -threads 0 public/video/GURU_portrait.mp4

## https://jshakespeare.com/encoding-browser-friendly-video-files-with-ffmpeg
## https://video.stackexchange.com/questions/19590/convert-mp4-to-webm-without-quality-loss-with-ffmpeg
