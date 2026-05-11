#!/usr/bin/env perl
use strict;
use warnings;
use File::Find;

# Hex → Tailwind @theme token mapping
my %HEX_MAP = (
    '#3D3835' => 'wool-900',
    '#524C48' => 'wool-700',
    '#6B6460' => 'wool-500',
    '#8C8580' => 'wool-300',
    '#B5AFA9' => 'wool-100',
    '#B5A288' => 'oat-500',
    '#D4C4B0' => 'oat-300',
    '#C5B49A' => 'oat-400',
    '#E0D4C2' => 'oat-200',
    '#F5F0E8' => 'oat-50',
    '#F7F4F0' => 'warm-white',
    '#FDFBF8' => 'cream',
    '#EDE5D8' => 'oat-100',
    '#C5C0B8' => 'fog-200',
    '#A8A29E' => 'fog-300',
);

my @UTILITIES = qw(
    bg text border ring fill stroke decoration outline
    marker caret selection placeholder accent divide
    ring-offset from via
);

# Build a combined utility pattern
my $util_pattern = join '|', @UTILITIES;

# Find all .tsx files
my @files;
find(sub { push @files, $File::Find::name if /\.tsx$/ }, 'src');

my %updated;

for my $file (@files) {
    open my $fh, '<:encoding(UTF-8)', $file or die "Cannot open $file: $!";
    my $content = do { local $/; <$fh> };
    close $fh;
    my $original = $content;

    for my $hex (keys %HEX_MAP) {
        my $token = $HEX_MAP{$hex};
        my $escaped_hex = quotemeta($hex);

        # Main replacement: (prefix:)*utility-[#hex]
        # Example: bg-[#3D3835] → bg-wool-900
        # Example: hover:bg-[#3D3835] → hover:bg-wool-900
        $content =~ s/
            \b((?:[a-z]+:)*)(bg|text|border|ring|fill|stroke|decoration|outline|marker|caret|selection|placeholder|accent|divide|ring-offset|from|via|to)-\[$escaped_hex\]
        /$1$2-$token/gx;
    }

    if ($content ne $original) {
        open my $out, '>:encoding(UTF-8)', $file or die "Cannot write $file: $!";
        print $out $content;
        close $out;
        $updated{$file} = 1;
        print "✅ Updated: $file\n";
    }
}

print "\n📊 " . scalar(keys %updated) . " files updated\n";
