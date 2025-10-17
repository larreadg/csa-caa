import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[doubleTap]' })
export class DoubleTapDirective {
  @Input() doubleTapDelay = 300;
  @Input() maxTapHold = 250;
  @Input() maxMove = 10;

  @Output() doubleTap = new EventEmitter<PointerEvent>();
  @Output() singleTap = new EventEmitter<PointerEvent>();

  private lastTapTime = 0;
  private lastTapX = 0;
  private lastTapY = 0;
  private downTime = 0;
  private startX = 0;
  private startY = 0;
  private clickTimeout: any = null;
  private preventClick = false;

  private get now() { return performance.now(); }

  @HostListener('pointerdown', ['$event'])
  onDown(e: PointerEvent) {
    if (e.button === 2) return;
    this.downTime = this.now;
    this.startX = e.clientX;
    this.startY = e.clientY;
  }

  @HostListener('pointerup', ['$event'])
  onUp(e: PointerEvent) {
    const held = this.now - this.downTime;
    const moved = Math.hypot(e.clientX - this.startX, e.clientY - this.startY);
    if (held > this.maxTapHold || moved > this.maxMove) return;

    const t = this.now;
    const dt = t - this.lastTapTime;
    const dd = Math.hypot(e.clientX - this.lastTapX, e.clientY - this.lastTapY);

    if (dt <= this.doubleTapDelay && dd <= this.maxMove) {
      // Doble tap detectado
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout);
        this.clickTimeout = null;
      }
      this.preventClick = true;
      this.doubleTap.emit(e);
      
      // Reset
      this.lastTapTime = 0;
      this.lastTapX = 0;
      this.lastTapY = 0;
      
      // Resetear flag después de un momento
      setTimeout(() => { this.preventClick = false; }, 50);
    } else {
      // Primer tap - esperamos para ver si hay doble tap
      this.lastTapTime = t;
      this.lastTapX = e.clientX;
      this.lastTapY = e.clientY;
      
      // Opcional: emitir singleTap después del delay
      if (this.clickTimeout) clearTimeout(this.clickTimeout);
      this.clickTimeout = setTimeout(() => {
        this.singleTap.emit(e);
        this.clickTimeout = null;
      }, this.doubleTapDelay);
    }
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    if (this.preventClick) {
      e.preventDefault();
      e.stopPropagation();
      (e as any).stopImmediatePropagation?.();
    }
  }

  @HostListener('pointercancel') onCancel() { 
    this.downTime = 0;
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    }
  }
  
  @HostListener('pointerleave') onLeave() { /* no-op */ }
}