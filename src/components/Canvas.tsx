import React, { useRef, useEffect } from 'react'

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement>;

const Canvas: React.FC<CanvasProps> = props => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const col = (x: number, y: number, r: number, g: number, b: number) => {
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, y, 10, 10);
        };

        const R = (x: number, y: number, t: number) => {
            return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 100 + t));
        };

        const G = (x: number, y: number, t: number) => {
            return Math.floor(
                192 +
                64 *
                Math.sin(
                    (x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 100
                )
            );
        };

        const B = (x: number, y: number, t: number) => {
            return Math.floor(
                192 +
                64 *
                Math.sin(
                    5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
                )
            );
        };

        for (let x = 0; x <= 35; x++) {
            for (let y = 0; y <= 35; y++) {
                col(x * 10, y * 10, R(x, y, (frameCount * Math.PI * 2) / 180) / 10, G(x, y, (frameCount * Math.PI * 2) / 180) / 10, B(x, y, (frameCount * Math.PI * 2) / 180) / 2);
            }
        }
    };

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        let frameCount = 0;
        let animationFrameId: number;

        //Our draw came here
        const render = () => {
            frameCount++
            if (context) {
                draw(context, frameCount)
            }
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas