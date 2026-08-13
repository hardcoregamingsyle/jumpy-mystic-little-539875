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
            expect(htmlContent).toMatch(/<html[^>]*lang=["']en["']/i);
        });
    });

    describe('Meta Tags', () => {
        it('must have charset meta tag with UTF-8', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset=["']UTF-8["']/i);
        });

        it('must have viewport meta tag for responsive design', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name=["']viewport["'][^>]*content=["']width=device-width,\s*initial-scale=1\.0["']/i);
        });
    });

    describe('Title', () => {
        it('must have a title element', () => {
            expect(htmlContent).toMatch(/<title>.*<\/title>/i);
        });

        it('must have non-empty title', () => {
            const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
            expect(titleMatch).not.toBeNull();
            if (titleMatch) {
                expect(titleMatch[1].trim().length).toBeGreaterThan(0);
            }
        });
    });

    describe('Body', () => {
        it('must have closing body tag', () => {
            expect(htmlContent).toMatch(/<\/body>/i);
        });

        it('must have closing html tag', () => {
            expect(htmlContent).toMatch(/<\/html>/i);
        });
    });
});
