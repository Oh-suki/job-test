import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

// 总帧数
const FRAME_COUNT = 280;

const SequenceCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const images = useRef<HTMLImageElement[]>([]);
    const contextRef = useRef<CanvasRenderingContext2D>(null);


    // 预加载图片
    useEffect(() => {
        const loadImages = [];
        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `/high/graded_4K_100_gm_85_1440_3-${String(i + 1).padStart(3, "0")}.jpg`;
            loadImages.push(img);
        }
        images.current = loadImages;
    }, []);

    // 初始化 canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = 1920;
        canvas.height = 1080;
        contextRef.current = canvas.getContext("2d");
    }, []);

    // 监听 Lenis 滚动
    useLenis(({ scroll, limit }) => {
        if (!contextRef.current || images.current.length === 0) return;

        // 计算进度 0~1
        const progress = scroll / limit;
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(progress * FRAME_COUNT)
        );

        // 绘制对应帧
        const img = images.current[frameIndex];
        if (img && img.complete && canvasRef.current) {
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            contextRef.current.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    });

    return (
        <>
            <div className="sticky top-0 h-screen overflow-clip">
                <canvas
                    ref={canvasRef}
                    style={{ objectFit: "cover" }}
                    className="w-full h-full"
                />
            </div>
        </>
    );
}

export default SequenceCanvas;