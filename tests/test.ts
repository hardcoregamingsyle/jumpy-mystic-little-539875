import * as fs from 'fs';
import * as path from 'path';

describe('HUD Radar HTML Structure Tests', () => {
    const htmlPath = path.join(__dirname, '..', 'index.html');
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

    describe('Head Section', () => {
        it('must contain meta charset declaration', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset=["']UTF-8["']/i);
        });

        it('must contain viewport meta tag for responsive design', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name="viewport"[^>]*content="width=device-width, initial-scale=1.0"/i);
        });

        it('must contain a title element', () => {
            expect(htmlContent).toMatch(/<title>.*<\/title>/i);
        });

        it('title must not be empty', () => {
            const match = htmlContent.match(/<title>(.*?)<\/title>/i);
            expect(match).not.toBeNull();
            expect(match![1].trim().length).toBeGreaterThan(0);
        });
    });

    describe('Body Section', () => {
        it('must have opening body tag', () => {
            expect(htmlContent).toMatch(/<body>/i);
        });

        it('must have closing body tag', () => {
            expect(htmlContent).toMatch(/<\/body>/i);
        });

        it('must have closing html tag', () => {
            expect(htmlContent).toMatch(/<\/html>/i);
        });
    });

    describe('Structural Integrity', () => {
        it('must have DOCTYPE before html tag', () => {
            const doctypeIndex = htmlContent.indexOf('<!DOCTYPE html>');
            const htmlIndex = htmlContent.indexOf('<html');
            expect(doctypeIndex).toBeGreaterThanOrEqual(0);
            expect(htmlIndex).toBeGreaterThan(doctypeIndex);
        });

        it('must have head before body', () => {
            const headIndex = htmlContent.indexOf('<head>');
            const bodyIndex = htmlContent.indexOf('<body>');
            expect(headIndex).toBeGreaterThanOrEqual(0);
            expect(bodyIndex).toBeGreaterThan(headIndex);
        });

        it('must have title inside head', () => {
            const headStart = htmlContent.indexOf('<head>');
            const headEnd = htmlContent.indexOf('</head>');
            const titleTag = htmlContent.indexOf('<title>');
            expect(headStart).toBeGreaterThanOrEqual(0);
            expect(headEnd).toBeGreaterThan(headStart);
            expect(titleTag).toBeGreaterThan(headStart);
            expect(titleTag).toBeLessThan(headEnd);
        });
    });
});
