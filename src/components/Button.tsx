'use client';

import {
  cloneElement,
  forwardRef,
  isValidElement,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MouseEvent,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  type Ref,
  type SVGProps,
  type TouchEvent,
  type TouchEventHandler,
} from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  icon?: ReactNode;
  iconOnly?: boolean;
  loading?: boolean;
  asChild?: boolean;
}

interface ChildElementProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
  onMouseDown?: MouseEventHandler<HTMLElement>;
  onMouseUp?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onTouchStart?: TouchEventHandler<HTMLElement>;
  onTouchEnd?: TouchEventHandler<HTMLElement>;
  onTouchCancel?: TouchEventHandler<HTMLElement>;
  onClick?: MouseEventHandler<HTMLElement>;
  'aria-disabled'?: boolean | 'true' | 'false';
  [key: string]: unknown;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null): void {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(value);
  } else {
    ref.current = value;
  }
}

const baseStyles = `
  group relative inline-flex h-max cursor-pointer items-center justify-center
  gap-1.5 whitespace-nowrap rounded-lg px-5 py-3 text-base font-semibold
  transition duration-100 ease-linear
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500
  disabled:cursor-not-allowed disabled:opacity-50
  aria-disabled:cursor-not-allowed aria-disabled:opacity-50
  [&_[data-icon]]:pointer-events-none [&_[data-icon]]:inline-flex [&_[data-icon]]:size-5 [&_[data-icon]]:shrink-0
  [&_[data-icon]]:items-center [&_[data-icon]]:justify-center
  [&_[data-icon]]:transition-transform [&_[data-icon]]:duration-200
  [&_[data-icon]_svg]:size-full
`;

const variants = {
  primary: `
    bg-brand-solid text-white shadow-xs-skeuomorphic ring-1 ring-transparent ring-inset
    hover:bg-brand-600
    active:bg-brand-600 active:shadow-none
  `,
  secondary: `
    rounded-full bg-transparent text-paper shadow-xs-skeuomorphic ring-1 ring-inset ring-white/25
    hover:bg-white/10
    active:bg-white/10
  `,
  tertiary: `
    rounded-full text-secondary
    hover:bg-white/5 hover:text-paper
    active:bg-white/10 active:text-paper
  `,
};

const loadingSpinner = (
  <svg
    className="animate-spin size-5 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

function renderButtonContent(content: ReactNode, icon: ReactNode, iconOnly?: boolean, loading?: boolean): ReactNode {
  if (loading) {
    return loadingSpinner;
  }

  if (iconOnly && icon) {
    return (
      <span data-icon aria-hidden="true">
        {icon}
      </span>
    );
  }

  return (
    <>
      {content}
      {icon && (
        <span data-icon aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      icon,
      iconOnly,
      loading,
      children,
      disabled,
      asChild,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);
    const isDisabled = Boolean(disabled || loading);

    const pressStyle: CSSProperties = {
      transform: isPressed ? 'translate3d(0, 1px, 0)' : 'translate3d(0, 0, 0)',
      transition: 'transform 0.5s ease-in-out',
    };

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<ChildElementProps>;
      const {
        className: childClassName,
        style: childStyle,
        children: childChildren,
        ref: childRef,
        onMouseDown: childOnMouseDown,
        onMouseUp: childOnMouseUp,
        onMouseLeave: childOnMouseLeave,
        onTouchStart: childOnTouchStart,
        onTouchEnd: childOnTouchEnd,
        onTouchCancel: childOnTouchCancel,
        onClick: childOnClick,
        'aria-disabled': childAriaDisabled,
        ...restChildProps
      } = child.props;

      const handleChildMouseDown: MouseEventHandler<HTMLElement> = (e) => {
        if (!isDisabled) setIsPressed(true);
        childOnMouseDown?.(e);
        onMouseDown?.(e as MouseEvent<HTMLButtonElement>);
      };

      const handleChildMouseUp: MouseEventHandler<HTMLElement> = (e) => {
        setIsPressed(false);
        childOnMouseUp?.(e);
        onMouseUp?.(e as MouseEvent<HTMLButtonElement>);
      };

      const handleChildMouseLeave: MouseEventHandler<HTMLElement> = (e) => {
        setIsPressed(false);
        childOnMouseLeave?.(e);
        onMouseLeave?.(e as MouseEvent<HTMLButtonElement>);
      };

      const handleChildTouchStart: TouchEventHandler<HTMLElement> = (e) => {
        if (!isDisabled) setIsPressed(true);
        childOnTouchStart?.(e);
        onTouchStart?.(e as TouchEvent<HTMLButtonElement>);
      };

      const handleChildTouchEnd: TouchEventHandler<HTMLElement> = (e) => {
        setIsPressed(false);
        childOnTouchEnd?.(e);
        onTouchEnd?.(e as TouchEvent<HTMLButtonElement>);
      };

      const handleChildTouchCancel: TouchEventHandler<HTMLElement> = (e) => {
        setIsPressed(false);
        childOnTouchCancel?.(e);
        onTouchCancel?.(e as TouchEvent<HTMLButtonElement>);
      };

      const handleChildClick: MouseEventHandler<HTMLElement> = (e) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }
        childOnClick?.(e);
        onClick?.(e as MouseEvent<HTMLButtonElement>);
      };

      const mergedRef: Ref<HTMLElement> | undefined =
        ref || childRef
          ? (node: HTMLElement | null) => {
              assignRef(ref, node as HTMLButtonElement | null);
              assignRef(childRef, node);
            }
          : undefined;

      const mergedProps: ChildElementProps = {
        ...(props as Record<string, unknown>),
        ...restChildProps,
        ...(mergedRef ? { ref: mergedRef } : {}),
        'data-pressed': isPressed,
        'data-icon-only': iconOnly ? true : undefined,
        'aria-disabled': isDisabled ? true : childAriaDisabled,
        'aria-busy': loading ? true : undefined,
        onMouseDown: handleChildMouseDown,
        onMouseUp: handleChildMouseUp,
        onMouseLeave: handleChildMouseLeave,
        onTouchStart: handleChildTouchStart,
        onTouchEnd: handleChildTouchEnd,
        onTouchCancel: handleChildTouchCancel,
        onClick: handleChildClick,
        className: cn(
          baseStyles,
          variants[variant],
          iconOnly && 'p-3.5',
          loading && 'cursor-wait',
          isDisabled && 'pointer-events-none',
          className,
          childClassName
        ),
        style: {
          ...style,
          ...childStyle,
          ...pressStyle,
        },
      };

      return cloneElement(
        child,
        mergedProps,
        renderButtonContent(childChildren, icon, iconOnly, loading)
      );
    }

    const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (e) => {
      if (!isDisabled) setIsPressed(true);
      onMouseDown?.(e);
    };

    const handleMouseUp: MouseEventHandler<HTMLButtonElement> = (e) => {
      setIsPressed(false);
      onMouseUp?.(e);
    };

    const handleMouseLeave: MouseEventHandler<HTMLButtonElement> = (e) => {
      setIsPressed(false);
      onMouseLeave?.(e);
    };

    const handleTouchStart: TouchEventHandler<HTMLButtonElement> = (e) => {
      if (!isDisabled) setIsPressed(true);
      onTouchStart?.(e);
    };

    const handleTouchEnd: TouchEventHandler<HTMLButtonElement> = (e) => {
      setIsPressed(false);
      onTouchEnd?.(e);
    };

    const handleTouchCancel: TouchEventHandler<HTMLButtonElement> = (e) => {
      setIsPressed(false);
      onTouchCancel?.(e);
    };

    return (
      <button
        ref={ref}
        {...props}
        data-pressed={isPressed}
        data-icon-only={iconOnly ? true : undefined}
        aria-busy={loading ? true : undefined}
        disabled={isDisabled}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onClick={onClick}
        className={cn(
          baseStyles,
          variants[variant],
          iconOnly && 'p-3.5',
          loading && 'cursor-wait',
          className
        )}
        style={{
          ...style,
          ...pressStyle,
        }}
      >
        {renderButtonContent(children, icon, iconOnly, loading)}
      </button>
    );
  }
);

Button.displayName = 'Button';

type IconProps = SVGProps<SVGSVGElement>;

export const ArrowIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7" />
    <path d="m12 19 7-7" />
  </svg>
);

export const DownloadIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const ExternalLinkIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const MailIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const PhoneIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const GitHubIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export const LinkedInIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const TwitterIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const HamburgerIcon = ({ isOpen, className, 'aria-hidden': ariaHidden, ...props }: IconProps & { isOpen: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5 transition-all duration-300 ease-out-expo', className)} {...props}>
    {isOpen ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ) : (
      <>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    )}
  </svg>
);

export const ChevronUpIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export const PlusIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const ChevronLeftIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const ChevronRightIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const ChevronDownIcon = ({ className, 'aria-hidden': ariaHidden, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={ariaHidden ?? 'true'} className={cn('size-5', className)} {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);