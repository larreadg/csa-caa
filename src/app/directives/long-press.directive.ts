// long-press.directive.ts
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[longPress]' })
export class LongPressDirective {
  @Input() longPressDuration = 600;           // ms (ajustable)
  @Output() longPress = new EventEmitter<PointerEvent>();
  @Output() longPressing = new EventEmitter<boolean>(); // opcional (true/false)

  private timer: any;

  @HostListener('pointerdown', ['$event'])
  onDown(e: PointerEvent) {
    if (e.button === 2) return;               // ignorar click derecho
    this.clear();
    this.longPressing.emit(true);
    this.timer = setTimeout(() => this.longPress.emit(e), this.longPressDuration);
  }

  @HostListener('pointerup')    onUp()    { this.cancel(); }
  @HostListener('pointerleave') onLeave() { this.cancel(); }
  @HostListener('pointercancel')onCancel(){ this.cancel(); }

  // Evita menú contextual al mantener pulsado en móvil, opcional:
  @HostListener('contextmenu', ['$event'])
  onContextMenu(e: Event) { e.preventDefault(); }

  private cancel() { this.clear(); this.longPressing.emit(false); }
  private clear()  { if (this.timer) { clearTimeout(this.timer); this.timer = null; } }
}
