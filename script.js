document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
        if (!el.querySelector('.display-4') && !el.querySelector('.letter-spacing')) {
            setTimeout(() => {
                el.style.animation = `fadeIn 0.8s ease forwards ${index * 0.2}s`;
            }, 100);
        }
    });

    class TextScrambler {
        constructor(el, text, delay = 0) {
            this.el = el;
            this.text = text;
            this.delay = delay;
            this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?αβγδεζηθικλμνξοπρστυφχψω';
        }
        
        async scramble() {
            await this.wait(this.delay);
            
            let iteration = 0;
            const speed = 50;
            
            this.el.classList.add('animating');
            
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    this.el.innerText = this.text
                        .split('')
                        .map((letter, index) => {
                            if(index < iteration) {
                                return this.text[index];
                            }
                            return this.chars[Math.floor(Math.random() * this.chars.length)];
                        })
                        .join('');
                    
                    if(iteration >= this.text.length) {
                        clearInterval(interval);
                        this.el.classList.remove('animating');
                        resolve();
                    }
                    
                    iteration += 1/3;
                }, speed);
            });
        }
        
        async unscramble() {
            let iteration = this.text.length;
            const speed = 50;
            
            this.el.classList.add('animating');
            
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    const visibleLength = Math.ceil(iteration);
                    this.el.innerText = this.text
                        .split('')
                        .map((letter, index) => {
                            if(index < visibleLength) {
                                return this.text[index];
                            }
                            return '';
                        })
                        .join('');
                    
                    const extraChars = Math.floor(Math.random() * 3) + 1;
                    for(let i = 0; i < extraChars; i++) {
                        this.el.innerText += this.chars[Math.floor(Math.random() * this.chars.length)];
                    }
                    
                    if(iteration <= 0) {
                        clearInterval(interval);
                        this.el.classList.remove('animating');
                        this.el.innerText = '';
                        resolve();
                    }
                    
                    iteration -= 1/3;
                }, speed);
            });
        }
        
        wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    const nameElement = document.querySelector('.display-4');
    const titleElement = document.querySelector('.letter-spacing');
    
    const nameScrambler = new TextScrambler(nameElement, 'Alex');
    const titleScrambler = new TextScrambler(titleElement, 'Frontend developer');
    
    nameElement.style.opacity = '0';
    titleElement.style.opacity = '0';
    
    async function runAnimation() {
        nameElement.style.opacity = '1';
        titleElement.style.opacity = '1';
        
        await nameScrambler.scramble();
        await nameScrambler.wait(200);
        
        await titleScrambler.scramble();
        
        await nameScrambler.wait(5000);
        
        await titleScrambler.unscramble();
        await nameScrambler.wait(200);
        await nameScrambler.unscramble();
        
        await nameScrambler.wait(500);
        
        runAnimation();
    }
    
    setTimeout(() => {
        runAnimation();
    }, 500);
});
