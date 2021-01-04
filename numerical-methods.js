const R = 10.10

export function forwardEuler(x0, u) {
    // x0 - initial value
    // f - f(x, u) 
   
    const x = new Array(u.length).fill(0);
    x[0] = x0

    for (let n = 0; n < u.length; n++) {
        x[n+1] = x[n] + (circuit(x[n], u[n]) * (1))
    }

    return x
}

export function odeBackwardEuler(x0, u) {
    //x0 - initial value f - f(x, u) 
    const x = new Array(u.length).fill(0);
    x[0] = x0

    for (let n = 0; n < u.length; n++) {
        let i_g = x[n] + (circuit(x[n], u[n]) * (1))

        for (let i = 0; i < 2; i++) {
            const gx = i_g - x[n] - circuit(i_g, u[n+1]) 
            const gdx = ((0.504 / 45.3) * Math.cosh(i_g / 45.3)) + (1 / (R * 10)) + 1
            i_g = i_g - (gx / gdx)  
        }
            

        x[n+1] = i_g
    }

    return x
}
function circuit(x, u) {
    return ((u - x) / (R * 10)) - ((0.504) * Math.sinh(x / 45.3)) 
}
    