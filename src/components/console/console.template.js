import {capitalize} from '../../core/utils'

export function createConsole(state) {
    return `
        <div class="console__header">
            Console:
        </div>
        <div class="console__items_container">
            ${state.shapes.map(shape => `
                <div class="console__item">
                    ${header(shape)}
                </div>
            `).join('')}
        </div>
    `
}

function header(shape) {
    if (shape.type === 'circle') {
        return `${capitalize(shape.type)} 
        (center: {x:${shape.center.x.toFixed(0)}, 
        y:${shape.center.x.toFixed(0)}}, 
        radius: ${shape.radius.toFixed(0)}, 
        border color: ${shape.background}, 
        fill color: ${shape.edgesColor})`
    } else {
        return `${capitalize(shape.type)}
        (border color: ${shape.background}, 
        fill color: ${shape.edgesColor})
        points: ${shape.points.map(point => `
            {x: ${point.x.toFixed(0)}, y: ${point.y.toFixed(0)}}
        `).join('')})`
    }
}