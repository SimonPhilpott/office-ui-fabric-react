import * as React from 'react';
import { HoverCard, IPlainCardProps, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { getColorFromString } from 'office-ui-fabric-react/lib/Color';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const itemClass = mergeStyles({
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  }
});

export class HoverCardPlainCardExample extends React.Component<{}, {}> {
  private _items: IExampleItem[] = createListItems(10);
  private _columns: IColumn[] = this._buildColumns();

  public render() {
    return (
      <Fabric>
        <p>
          Hover over the <i>color</i> cell of a row item to see the card.
        </p>
        <DetailsList setKey="hoverSet" items={this._items} columns={this._columns} onRenderItemColumn={this._onRenderItemColumn} />
      </Fabric>
    );
  }

  private _onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | React.ReactText => {
    const plainCardProps: IPlainCardProps = {
      onRenderPlainCard: this._onRenderPlainCard,
      renderData: item
    };

    if (column.key === 'color') {
      return (
        <HoverCard plainCardProps={plainCardProps} instantOpenOnClick={true} type={HoverCardType.plain}>
          <div className={itemClass} style={{ color: item.color }}>
            {item.color}
          </div>
        </HoverCard>
      );
    }

    return item[column.key as keyof IExampleItem];
  };

  private _onRenderPlainCard = (item: IExampleItem): JSX.Element => {
    const src = item.thumbnail + `/${getColorFromString(item.color)!.hex}`;

    return <Image src={src} width={item.width} height={item.height} imageFit={ImageFit.cover} />;
  };

  private _buildColumns(): IColumn[] {
    return buildColumns(this._items).filter(column => column.name === 'color' || column.name === 'width' || column.name === 'height');
  }
}
