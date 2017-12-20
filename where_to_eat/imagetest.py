import os
from PIL import Image
def imageAdjust(s):
        im = Image.open(s)
        x_ = 300#看你们的调整改大小
        y_ = 400
        out = im.resize((x_, y_), Image.ANTIALIAS)
        out.save(s)
def main():
    mainpath = "D:/test"#这个地方写文件目录 例如 D:/CloudMusic
    path = os.listdir(mainpath)
    for someone in path:
        filepath = os.path.join(mainpath+"/"+someone)
        imageAdjust(filepath);
if __name__ == "__main__":
    main()
