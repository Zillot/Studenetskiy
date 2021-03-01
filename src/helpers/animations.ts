import { trigger, transition, style, animate } from '@angular/animations';

export const ShowByLeftOffset = trigger('ShowByLeftOffset', [
  transition('void => *', [
    style({ left: "-300px", opacity: 0 }),
    animate('300ms ease-in-out')
  ]),
]);

export const HideByRightOffset = trigger('HideByRightOffset', [
  transition('void => *', [
    animate('305ms ease-in-out', style({ left: "300px", opacity: 0 }))
  ])
]);

export const ShowAndHideByLeftOffset = trigger('ShowAndHideByLeftOffset', [
  transition('void => *', [
    style({ left: "-300px", opacity: 0 }),
    animate('300ms ease-in-out')
  ]),
  transition('* => void', [
    style({ position: "absolute", top: "0" }),
    animate('300ms ease-in-out', style({ left: "600px", top: "0", opacity: 0 }))
  ])
]);

export const ShowAndHideByOpacity = trigger('ShowAndHideByOpacity', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate("500ms"),
  ]),
  transition('* => void', [
    animate("500ms", style({ opacity: 0 }))
  ])
]);

export const ShowAndHideByOpacityQuick = trigger('ShowAndHideByOpacityQuick', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate("300ms"),
  ]),
  transition('* => void', [
    animate("300ms", style({ opacity: 0 }))
  ])
]);

export const ShowAndHideByHeight = trigger('ShowAndHideByHeight', [
  transition('void => *', [
    style({ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0 }),
    animate("200ms linear")
  ]),
  transition('* => void', [
    animate("200ms linear", style({ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0 })),
  ])
]);

export const ShowAndHideByOpacityWithDelayAtEnd = trigger('ShowAndHideByOpacityWithDelayAtEnd', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate("200ms"),
  ]),
  transition('* => void', [
    animate("300ms 200ms", style({ opacity: 0 }))
  ])
]);

export const ShowAndHideByOpacityWithDelay = trigger('ShowAndHideByOpacityWithDelay', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate("500ms 200ms"),
  ]),
  transition('* => void', [
    animate("500ms 200ms", style({ opacity: 0 }))
  ])
]);

