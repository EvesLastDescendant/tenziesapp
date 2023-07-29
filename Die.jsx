import React from "react"

export default function Die(prop) {
    const style = {
        backgroundColor: prop.held ? "var(--die--color)" : "var(--wite)"
    }
    
    return (
        <div 
            className="die--face" 
            style={style} 
            onClick={prop.hold}
        >
            <div className="die--dot">
                {prop.value === 1 && (
                    <div className="column one--dot">
                        <span className="dot"></span>
                    </div>
                )}
                {prop.value === 2 && (
                    <div className="column two--dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                )}
                {prop.value === 3 && (
                    <div className="column three--dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                )}
                {prop.value === 4 && (
                    <div className="column four--dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                )}
                {prop.value === 5 && (
                    <div className="column five--dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                )}
                {prop.value === 6 && (
                    <div className="column six--dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                )}
            </div>
        </div>
    )
}