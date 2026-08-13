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
            expect(htmlContent).toMatch(/<html[^>]*lang="en"[^>]*>/i);
        });
    });

    describe('Head Section', () => {
        it('must contain head element', () => {
            expect(htmlContent).toMatch(/<head>/i);
            expect(htmlContent).toMatch(/<\/head>/i);
        });

        it('must have charset meta tag with UTF-8', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset="UTF-8"[^>]*>/i);
        });

        it('must have viewport meta tag for responsive design', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name="viewport"[^>]*content="width=device-width,\s*initial-scale=1\.0"[^>]*>/i);
        });

        it('must have title element with non-empty content', () => {
            expect(htmlContent).toMatch(/<title>[^<]+<\/title>/i);
            const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/i);
            expect(titleMatch).not.toBeNull();
            if (titleMatch) {
                expect(titleMatch[1].trim().length).toBeGreaterThan(0);
            }
        });
    });

    describe('Body Section', () => {
        it('must contain body element', () => {
            expect(htmlContent).toMatch(/<body>/i);
            expect(htmlContent).toMatch(/<\/body>/i);
        });

        it('body must be empty initially', () => {
            const bodyMatch = htmlContent.match(/<body>([\s\S]*)<\/body>/i);
            expect(bodyMatch).not.toBeNull();
            if (bodyMatch) {
                expect(bodyMatch[1].trim()).toBe('');
            }
        });
    });

    describe('Structural Integrity', () => {
        it('must have proper html closing tag', () => {
            expect(htmlContent).toMatch(/<\/html>/i);
        });

        it('must have head before body', () => {
            const headIndex = htmlContent.indexOf('<head>');
            const bodyIndex = htmlContent.indexOf('<body>');
            expect(headIndex).toBeGreaterThan(-1);
            expect(bodyIndex).toBeGreaterThan(-1);
            expect(headIndex).toBeLessThan(bodyIndex);
        });

        it('must not contain any script tags in initial state', () => {
            expect(htmlContent).not.toMatch(/<script[^>]*>/i);
        });
    });
});
