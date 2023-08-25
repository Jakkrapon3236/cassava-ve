clc;
clear all;
I=imread('All.PNG');
ROW1=imcrop(I,[0 0 1317 70]);
ROW2=imcrop(I,[0 91 1317 185-92]); 
ROW3=imcrop(I,[0 208 1317 315-208]); 
ROW4=imcrop(I,[0 340 1317 409-340]); 
ROW5=imcrop(I,[0 432 1317 500-432]); 
ROW6=imcrop(I,[0 524 1317 614-524]); 
figure(1);
for i=0:17
    B1=imcrop(ROW1,[(i*73.16) 0 73.16 70]);
    B2=imcrop(ROW2,[(i*73.16) 0 73.16 185-92]);
    B3=imcrop(ROW3,[(i*73.16) 0 73.16 315-208]); 
    B4=imcrop(ROW4,[(i*73.16) 0 73.16 409-340]); 
    B5=imcrop(ROW5,[(i*73.16) 0 73.16 500-432]); 
    B6=imcrop(ROW6,[(i*73.16) 0 73.16 614-524]);
    imwrite(B1,strcat('Feature1_',int2str(i+1),'.png'));
    imwrite(B2,strcat('Feature2_',int2str(i+1),'.png'));
    imwrite(B3,strcat('Feature3_',int2str(i+1),'.png'));
    imwrite(B4,strcat('Feature4_',int2str(i+1),'.png'));
    imwrite(B5,strcat('Feature5_',int2str(i+1),'.png'));
    imwrite(B6,strcat('Feature6_',int2str(i+1),'.png'));
end






