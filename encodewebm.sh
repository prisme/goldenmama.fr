#!/bin/bash

ffmpeg -i public/video/MAMA.mp4 -y -c:v libvpx-vp9 -crf 29 -b:v 0 public/video/MAMA.webm
ffmpeg -i public/video/GURU.mp4 -y -c:v libvpx-vp9 -crf 29 -b:v 0 public/video/GURU.webm
ffmpeg -i public/video/MAMA_portrait.mp4 -y -c:v libvpx-vp9 -crf 29 -b:v 0 public/video/MAMA_portrait.webm
ffmpeg -i public/video/GURU_portrait.mp4 -y -c:v libvpx-vp9 -crf 29 -b:v 0 public/video/GURU_portrait.webm
# https://video.stackexchange.com/questions/19590/convert-mp4-to-webm-without-quality-loss-with-ffmpeg
# https://trac.ffmpeg.org/wiki/Encode/VP9
