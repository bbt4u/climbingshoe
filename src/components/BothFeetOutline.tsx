/** SVG overlay showing left and right foot outlines for photo alignment */
export default function BothFeetOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 220" className={className}>
      {/* Left foot */}
      <g transform="translate(20, 10)">
        <ellipse cx="55" cy="160" rx="38" ry="42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
        <ellipse cx="75" cy="110" rx="8" ry="11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="63" cy="103" rx="7" ry="10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="50" cy="107" rx="6.5" ry="9.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="39" cy="113" rx="6" ry="8.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="30" cy="122" rx="5.5" ry="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
      </g>
      {/* Right foot */}
      <g transform="translate(130, 10)">
        <ellipse cx="55" cy="160" rx="38" ry="42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
        <ellipse cx="35" cy="110" rx="8" ry="11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="47" cy="103" rx="7" ry="10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="60" cy="107" rx="6.5" ry="9.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="71" cy="113" rx="6" ry="8.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="80" cy="122" rx="5.5" ry="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
      </g>
    </svg>
  );
}
