import { Injectable } from '@angular/core';
import { Icons } from './icons';

@Injectable({ providedIn: 'root' })
export class IconsRegistry {

    private registry = new Map<string, string> ();

    public registryIcons(icons: Icons[]): void {
        icons.forEach((icon: Icons) => this.registry.set(icon.name, icon.data));
    }

    public getIcon(iconName: string): string | undefined {
        if (!this.registry.has(iconName)){
            console.warn(`We could not find the icon with ${iconName}, did you add it to the Icon registry?`);
        }

        return this.registry.get(iconName);
    }
}