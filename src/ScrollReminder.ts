import './ScrollReminder.css';

export interface ScrollReminderOptions {
  threshold?: number;
  text?: string;
  targetContainer?: HTMLElement;
}

export class ScrollReminder {
  private element: HTMLElement | null = null;
  private scrollHandler: (() => void) | null = null;
  private threshold: number;
  private text: string;
  private targetContainer: HTMLElement;

  constructor(options: ScrollReminderOptions = {}) {
    this.threshold = options.threshold ?? 30;
    this.text = options.text ?? 'Scroll Down';
    this.targetContainer = options.targetContainer ?? document.body;
  }

  /**
   * Initializes the Scroll Reminder component by creating the elements and starting the scroll tracking.
   */
  public init(): void {
    if (this.element) {
      return;
    }

    // Create container element
    const container: HTMLElement = document.createElement('div');
    container.className = 'scroll-reminder';

    // Create text element
    const textEl: HTMLElement = document.createElement('div');
    textEl.className = 'scroll-reminder__text';
    textEl.textContent = this.text;
    container.appendChild(textEl);

    // Create wrapper for the bouncing arrow
    const arrowWrapper: HTMLElement = document.createElement('div');
    arrowWrapper.className = 'scroll-reminder__arrow-wrapper';

    // Create crisp inline SVG element for the chevron arrow
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg: SVGSVGElement = document.createElementNS(svgNS, 'svg') as SVGSVGElement;
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'scroll-reminder__arrow');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');

    const path: SVGPathElement = document.createElementNS(svgNS, 'path') as SVGPathElement;
    path.setAttribute('d', 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z');
    path.setAttribute('fill', 'currentColor');
    svg.appendChild(path);

    arrowWrapper.appendChild(svg);
    container.appendChild(arrowWrapper);

    this.targetContainer.appendChild(container);
    this.element = container;

    // Set up passive scroll tracking
    this.scrollHandler = (): void => {
      if (!this.element) return;

      const currentScrollY = window.scrollY;
      if (currentScrollY > this.threshold) {
        this.element.classList.add('hidden');
      } else if (currentScrollY === 0) {
        this.element.classList.remove('hidden');
      }
    };

    // Run once to evaluate initial position
    this.scrollHandler();

    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  /**
   * Cleans up event listeners and removes the elements from DOM to prevent memory leaks.
   */
  public destroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = null;
    }

    if (this.element) {
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      this.element = null;
    }
  }
}
