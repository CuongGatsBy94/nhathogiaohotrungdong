/**
 * @Author: Your name
 * @Date:   2024-11-05 19:37:35
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-05 22:23:35
 */
'use strict';
...
document.addEventListener('DOMContentLoaded', () => {
                // Get all buttons and images
                const buttons = document.querySelectorAll('.button');
                const images = document.querySelectorAll('.img');
                const imageSlider = document.querySelector('.image-slider');

                buttons.forEach((button, index) => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();

                        // Reset all images and buttons to default state
                        images.forEach(img => {
                            img.style.transform = 'scale(1)';
                            img.style.filter = 'saturate(10%)';
                        });

                        buttons.forEach(btn => {
                            btn.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                        });

                        // Scale the clicked image
                        images[index].style.transform = 'scale(1.3)';
                        images[index].style.filter = 'saturate(100%)';

                        // Remove background color from the clicked button
                        button.style.backgroundColor = 'transparent';

                        // Move the image-slider based on which button is clicked
                        switch (index) {
                            case 0:
                                imageSlider.style.left = '70%';
                                break;
                            case 1:
                                imageSlider.style.left = '50%';
                                break;
                            case 2:
                                imageSlider.style.left = '25%';
                                break;
                            case 3:
                                imageSlider.style.left = '0%';
                                break;
                            case 4:
                                imageSlider.style.left = '-25%';
                                break;
                            case 5:
                                imageSlider.style.left = '-50%';
                                break;
                            case 6:
                                imageSlider.style.left = '-70%';
                                break;
                        }
                    });
                });
            });
...