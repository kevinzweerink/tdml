# TDML

TDML is a specification for a new markup convention designed for list-making. TDML stands for To-Do Markup Language. The goal of TDML is to standardize how I create and manage to-do lists, and to hypothesize a framework for to-do list data such that it could theoretically be ported between platforms with ease. 

## Basis

To-do tools are omnipresent. Lists have long been important to productivity for many, and recent years have seen an explosion in applications that serve this organizational strategy, to the point where the to-do app has become as common a portfolio piece for young designers and developers as the type specimen book or the show poster. TodoMVC has turned the simple to-do list into a conceptual constant in the process of learning any of an exhaustive list of javascript frameworks.

Increasingly, I find myself unhappy with many of these tools. My preference is for a simple text file, or pen and paper. And I don’t feel alone in my desire for freedom from the imposed taxonomies and hierarchies of whatever to-do tool has most recently figured out the supposed best structure for me to be productive. This is not to decry the utility of such tools, but rather to acknowledge that this ecosystem is _not_ evolving toward some paragon of productivity, but rather is a diverse and complex system built of countless variations on a theme that cater to the desires of individual creators in hopes of sympathesis.

TDML is thus a proposed framework to standardize the language of list-making and preserve the list itself in its ever-changing and inconsistent context. It is not associated with a specific technology, but is instead a proposed pattern for creation, storage, and interpretation of list data.

## Goals

1. Create a flexible and adaptable text-based system for creation, prioritization, and interaction with lists.
2. Create a de facto data model for lists that can be easily imported and exported from the list-making app _du jour_.

## Structure & Syntax

### Basic List Items
All lists are built of list items. The list item is the universal building block of the list. List items are not inherently actionable items, as in a to-do list where an item is done or not done, but are instead simply discrete ideas related to the topic of the list.

A standard list item is denoted by an asterisk and a space.

	* this is a standard list item

A list can also have an intrinsic order. To create a list item in an ordered list, simply use a numeral plus a period.

	1. This is an ordered list item

### Completed List Items

An item can be marked as done by adding a modifier character before the asterisk. The modifier to mark an item as done can be either a `/` or a `-` character.

	* this is a standard list item
	-* this is a completed list item

or 

	* this is a standard list item
	/* this is a completed list item

The modifier to mark an item as done is placed at the beginning of the item to allow easy motion between items with only the up and down arrows.

### Prioritization

Lists frequently involve prioritization, and are often used as a triage tool to figure out what is most important to address. TDML supports flexible prioritization with unlimited levels of priority, as well as a basic importance marker for single-level prioritization.

Single level priority is indicated with a carat and an exclamation point. Multiple levels are indicated with a carat followed by the level of priority (with 1 being highest priority, and priority decreasing as the numbers increase).

	* this is a standard list item
	* this is an important list item ^!

or 

	* this is a standard list item
	* this is a high priority list item ^1
	* this is a lower priority list item ^2
	* this is the lowest priority list item on this list ^8

### Tags
Often, lists will contain related items that do not necessarily warrant their own list. For these, TDML proposes tagging, a simple way to conceptually group list items and indicate relation. Tags can appear anywhere within a list item.

	* this is a standard list item
	* this is a tagged list item #topicA
	* this list item relates to #topicB and is a differently tagged list item

### Files
TDML files are saved with the extension `.td`.

## Project Status
This is the very beginning of this project. The overarching ideas are here, but no technical implementation is in place yet.
I'd like to figure out how to build an interpreter for TDML, and perhaps a simple text editor designed to work well with it. I'd also like to continue to improve and expand the syntax, shown here in its most basic form. This project is open to suggestions and contributions.