import * as fs from 'fs';
import * as path from 'path';

describe('HUD Radar HTML Structure Tests', () => {
    const htmlPath = path.join(__dirname, '..', 'src', 'index.html');
    let htmlContent: string;

    beforeAll(() => {
        expect(fs.existsSync(htmlPath)).toBe(true);
        htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    });

    describe('Document Type Declaration', () => {
        it('must contain valid HTML5 DOCTYPE declaration', () => {
            expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
        });
    });

    describe('HTML Tag', () => {
        it('must have opening html tag with lang attribute', () => {
            expect(htmlContent).toMatch(/<html[^>]*lang=["'][^"']+["']/i);
        });

        it('must specify English language code', () => {
            expect(htmlContent).toMatch(/<html[^>]*lang="en"/i);
        });
    });

    describe('Meta Tags', () => {
        it('must have charset UTF-8 meta tag', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset="UTF-8"/i);
        });

        it('must have viewport meta tag with width=device-width and initial-scale=1', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name="viewport"[^>]*content="width=device-width, initial-scale=1.0"/i);
        });
    });

    describe('Title Element', () => {
        it('must have a title element with accurate project name', () => {
            expect(htmlContent).toMatch(/<title>Stealth Bomber HUD Radar<\/title>/i);
        });
    });

    describe('Closing Tags', () => {
        it('must have closing html tag', () => {
            expect(htmlContent).toMatch(/<\/html>/i);
        });

        it('must have closing head tag', () => {
            expect(htmlContent).toMatch(/<\/head>/i);
        });

        it('must have closing body tag', () => {
            expect(htmlContent).toMatch(/<\/body>/i);
        });
    });
});